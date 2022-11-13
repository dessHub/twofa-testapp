import React, {useState, useEffect} from 'react';
import './App.css';
import 'https://desshub.gitlab.io/two-fa-widget/index.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'two-fa-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { email?: string };
    }
  }
}

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLogInForm, setIsLogInForm] = useState(true);
  const [user, setUser] = useState<{email: string, password: string} | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      const twoFaNode = document.querySelector('two-fa-widget');

      twoFaNode?.addEventListener('twoFaCallback', twoFaCallback);
    }
  }, [user]);

  function twoFaCallback(event: Event): void {
    console.log('=======event', event); // event.detail[0] get the response from the widget
    // this is where you redirect to dashboard if that was the intention after loggin
    setIsAuthenticating(false);
    setIsLoggedin(true);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser({ email, password });
    setIsLogInForm(false);
    setIsAuthenticating(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  return (
    <div className="App">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {isLogInForm && (
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={onSubmit}>
              <div className="-space-y-px rounded-md shadow-sm">
                <input
                  type="email"
                  name="email"
                  placeholder="test@mail.com"
                  onChange={handleChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="-space-y-px rounded-md shadow-sm">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        )}
        {isAuthenticating && (
          <div className="w-full max-w-md space-y-8">
            <div>Widget interface</div>
            <two-fa-widget email={JSON.stringify(user?.email || '')}></two-fa-widget>
          </div>
        )}
        {isLoggedin && (
          <div className="w-full max-w-md space-y-8">
            Yay!!!! you are verified!!!!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
