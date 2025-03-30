from celery import Celery
import os
from dotenv import load_dotenv

load_dotenv()

celery_app = Celery(
    "worker",
    broker=os.getenv("REDIS_URL"),
    backend=os.getenv("REDIS_URL")
)

celery_app.conf.task_routes = {
    "app.worker.test_celery": "main-queue",
    "app.worker.process_notification": "notification-queue",
    "app.worker.process_payment": "payment-queue"
}

celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
)

# Configurações de retry
celery_app.conf.task_acks_late = True
celery_app.conf.task_reject_on_worker_lost = True
celery_app.conf.task_annotations = {
    '*': {
        'retry_backoff': True,
        'retry_backoff_max': 3600,
        'max_retries': 3,
    }
} 