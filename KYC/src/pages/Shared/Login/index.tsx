import { useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import Input from '@/components/input';
import Button from '@/components/button';
import { useEffect } from 'react';

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
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit((x) => mutate(x))}>
          <h2 className="text-2xl font-bold mb-6 text-left text-gray-800">Login to Your Account</h2>
          <div className="mb-4">
            <Input
              label="Username (min 6 - max 10 chars)"
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 6,
                  message: 'Username must be between 6 and 10 characters',
                },
                maxLength: {
                  value: 10,
                  message: 'Username must be between 6 and 10 characters',
                },
              })}
              error={errors.username?.message}
              placeholder="Enter your username"
              defaultValue="emilys"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Password (min 10 - max 16 chars)"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 10,
                  message: 'Password must be between 10 and 16 characters',
                },
                maxLength: {
                  value: 16,
                  message: 'Password must be between 10 and 16 characters',
                },
              })}
              error={errors.password?.message}
              placeholder="Enter your password"
              defaultValue="emilyspass"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
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

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account? {' '}
          <Link to={ROUTES.signup} className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
