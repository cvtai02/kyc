import { useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import Input from '@/components/input';
import Button from '@/components/button';
import { toast } from 'react-toastify';

interface LoginFormData {
  email: string;
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
      return login(data.email, data.password);
    },
    onSuccess: () => {
      toast.success('Login successful!');
      navigate('/');
    },
  })

  // Redirect if already authenticated
  if (isAuthenticated()) {
    navigate('/');
    return null;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>
        <form className="mt-6" onSubmit={handleSubmit((x) => mutate(x))}>
          <div className="mb-4">
            <Input
              label="Email"
              {...register('email', {
                required: 'Email is required',
              })}
              error={errors.email?.message}
              placeholder="Enter your email"
              defaultValue="emilys"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
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
            fullWidth
            isLoading={isPending}
          >
            Login
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
