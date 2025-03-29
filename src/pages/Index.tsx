import React, { useEffect } from "react";
import { Link, useRouter } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/ui/AnimatedLogo";
import { 
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  BarChart3,
  FileText,
  Database,
  Lock,
  Users,
  Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from '../contexts/AuthContext';

const Index: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return null;
};

export default Index;
