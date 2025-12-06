import { useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import Input from '@/components/input';
import Button from '@/components/button';
import { useEffect } from 'react';
import Title from '@/components/title';
import Logo from '@/components/logo';
import Card from '@/components/card';

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormData) => {
      //TODO: handle remember me
      return login(data.username, data.password);
    },
    onSuccess: () => {
      navigate('/');
    },
  })

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-muted flex gap-10 flex-col items-center justify-center min-h-screen">
      <ul className="top-8 left-8 absolute text-gray-600 text-left mb-2">
        <li> <strong>officer: michaelw/michaelwpass</strong></li>
        <li> <strong>user: abigailr/abigailrpass</strong></li>
      </ul>
      <Logo size='lg' text="Simple KYC Authentication" />
      <Card className="max-w-xl">
        <form onSubmit={handleSubmit((x) => mutate(x))}>
          <Title text="Sign in to platform" variant="large"  />
          <div className="mb-4">
            <Input
              label="Username"
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 8,
                  message: 'Username must be between 8 and 10 characters',
                },
                maxLength: {
                  value: 10,
                  message: 'Username must be between 8 and 10 characters',
                },
              })}
              errorMessage={errors.username?.message}
              placeholder="Enter your username"
              defaultValue="abigailr"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 12,
                  message: 'Password must be between 12 and 16 characters',
                },
                maxLength: {
                  value: 16,
                  message: 'Password must be between 12 and 16 characters',
                },
                pattern: {
                  value: /^[A-Za-z0-9@#&!]+$/,
                  message: 'Password only accepts letters, numbers, and these special characters (@, #, &, !)',
                },
              })}
              errorMessage={errors.password?.message}
              placeholder="Enter your password"
              defaultValue="abigailrpass"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-2 text-sm text-secondary">Remember me</span>
            </label>
            <a href="#" className="text-sm text-link hover:underline">
              Lost password?
            </a>
          </div>

          <Button
            type="submit"
            className="ml-0"
            isLoading={isPending}
          >
            Login to Your Account
          </Button>
        </form>

        <p className="mt-4 text-sm text-secondary">
          Don't have an account? {' '}
          <Link to={ROUTES.signup} className="text-link hover:underline">Sign up</Link>
        </p>
      </Card>
    </div>
  );
}
