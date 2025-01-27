import './App.css';
import router from './routes';
import { RouterProvider } from 'react-router-dom';
import { ThemeContext } from './context/theme';
import { useContext } from 'react';
import { UsersProvider } from './context/members/context';
import { TasksProvider } from './context/task/context';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className={`h-screen w-full mx-auto ${theme === "dark" ? "dark" : ""}`}>
        <UsersProvider>
          <TasksProvider>
            <RouterProvider router={router} />
          </TasksProvider>
        </UsersProvider>
      </div>
    </>
  );
}

export default App;
