import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom';
import { LoginForm } from './pages/Login';
import { Sections } from './pages/Sections';
import { Root } from './pages/Root';
import { CrearExpoForm } from './pages/ExpoCreate';

const router = createBrowserRouter([
    {
        path: '/', element: <Root />,
        children: [
            { index: true, element: <Sections /> },
            { path: 'login', element: <LoginForm /> },
            {
                path: 'dashboard', children: [
                    { path: 'new_expo', element: <CrearExpoForm /> }
                ]
            },
        ]
    }
])

export const App = () => <RouterProvider {...{ router }} />
