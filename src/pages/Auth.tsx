
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Auth: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    age18: false,
  });
  
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        console.log("Current session:", data.session);
        if (data.session) {
          console.log("User is already logged in, redirecting to home page");
          navigate('/');
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session);
        if (session) {
          console.log("User authenticated, redirecting to home page");
          navigate('/');
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setSignupData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast.error(t('login.errorRequiredFields'));
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Attempting to sign in with email:", loginData.email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });
      
      if (error) {
        console.error("Login error:", error);
        toast.error(error.message);
      } else {
        console.log("Login successful:", data);
        toast.success(t('login.success'));
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t('login.error'));
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupData.name || !signupData.email || !signupData.password) {
      toast.error(t('signup.errorRequiredFields'));
      return;
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error(t('signup.errorPasswordMatch'));
      return;
    }
    
    if (!signupData.agreeTerms || !signupData.age18) {
      toast.error(t('signup.errorAgreement'));
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Attempting to sign up with email:", signupData.email);
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            name: signupData.name
          }
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
        toast.error(error.message);
      } else {
        console.log("Signup successful:", data);
        toast.success(t('signup.success'));
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          toast.info(t('signup.emailConfirmation'));
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(t('signup.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-12">
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm dark:bg-freelo-dark/60 rounded-xl p-8 shadow-lg border border-border">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{t('auth.title')}</h1>
              <p className="text-muted-foreground">{t('auth.description')}</p>
            </div>
            
            <Tabs defaultValue="login" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{t('nav.login')}</TabsTrigger>
                <TabsTrigger value="signup">{t('nav.signup')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="login-email"
                        name="email"
                        type="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        placeholder="your@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="login-password">Password</Label>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-freelo-purple hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={handleLoginChange}
                        placeholder="••••••••"
                        className="pl-10"
                      />
                      <button 
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? 
                          <EyeOff className="h-4 w-4" /> : 
                          <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 font-medium"
                    disabled={loading}
                  >
                    {loading ? t('login.processing') : t('nav.login')}
                  </Button>
                  
                  <div className="text-center text-sm">
                    {t('login.noAccount')} <button type="button" onClick={() => setActiveTab("signup")} className="text-freelo-purple hover:underline">{t('nav.signup')}</button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignupSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('signup.name')}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="name"
                        name="name"
                        type="text"
                        value={signupData.name}
                        onChange={handleSignupChange}
                        placeholder={t('signup.namePlaceholder')}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('signup.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={signupData.email}
                        onChange={handleSignupChange}
                        placeholder={t('signup.emailPlaceholder')}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">{t('signup.password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={signupData.password}
                        onChange={handleSignupChange}
                        placeholder={t('signup.passwordPlaceholder')}
                        className="pl-10"
                      />
                      <button 
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? 
                          <EyeOff className="h-4 w-4" /> : 
                          <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        placeholder={t('signup.confirmPasswordPlaceholder')}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="agreeTerms" 
                        checked={signupData.agreeTerms}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('agreeTerms', checked as boolean)
                        }
                      />
                      <Label htmlFor="agreeTerms" className="text-sm font-normal cursor-pointer">
                        {t('signup.agreeTerms')} <Link to="/terms" className="text-freelo-purple hover:underline">{t('signup.termsLink')}</Link>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="age18" 
                        checked={signupData.age18}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('age18', checked as boolean)
                        }
                      />
                      <Label htmlFor="age18" className="text-sm font-normal cursor-pointer">
                        {t('signup.age18')}
                      </Label>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:opacity-90 font-medium"
                    disabled={loading}
                  >
                    {loading ? t('signup.processing') : t('nav.signup')}
                  </Button>
                  
                  <div className="text-center text-sm">
                    {t('signup.alreadyAccount')} <button type="button" onClick={() => setActiveTab("login")} className="text-freelo-purple hover:underline">{t('nav.login')}</button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
