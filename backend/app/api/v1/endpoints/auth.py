from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from datetime import timedelta
from typing import Any

from app.db.base import get_session
from app.models.user import User, UserCreate
from app.services.auth import AuthService
from app.core.security import get_current_user

router = APIRouter()

@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
) -> Any:
    user = session.query(User).filter(User.email == form_data.username).first()
    if not user or not AuthService.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )

    access_token_expires = timedelta(minutes=30)
    access_token = AuthService.create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )

    if user.requires_2fa:
        return {
            "requires_2fa": True,
            "temp_token": access_token
        }

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/verify-2fa")
async def verify_2fa(
    token: str,
    two_factor_token: str,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
) -> Any:
    if not AuthService.verify_2fa_token(current_user.two_factor_secret, two_factor_token):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid 2FA token"
        )

    access_token_expires = timedelta(minutes=30)
    access_token = AuthService.create_access_token(
        data={"sub": current_user.email, "2fa_verified": True},
        expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/setup-2fa")
async def setup_2fa(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
) -> Any:
    if current_user.two_factor_secret:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="2FA is already set up"
        )

    secret = AuthService.generate_2fa_secret()
    current_user.two_factor_secret = secret
    current_user.requires_2fa = True
    session.add(current_user)
    session.commit()

    return {
        "secret": secret,
        "uri": AuthService.get_2fa_uri(secret, current_user.email)
    } 