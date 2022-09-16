import { FormEvent, useRef, useState } from 'react'
import { Outlet, RouterProvider, useNavigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import { createBrowserRouter } from 'react-router-dom';

function Header() {
    return <header className="flex px-4 h-12 gap-2 items-center">
        <strong>ONETP Admin</strong>
        <div className="grow-1" />
        <button className="bg-red text-white font-bold rd-2 px-4 h-10 sizing-border">
            Cerrar sesión
        </button>
    </header>
}

type APIResponse<D> = {
    error: true,
    message: string,
} | {
    error: false,
    data: D
}


class API {
    url: string
    auth?: string = undefined

    constructor(url: string) {
        this.url = url
    }

    async send<D>(path: string, method: string, json: {}, authorized: boolean = false): Promise<APIResponse<D>> {
        if (authorized && !this.auth) throw Error("unauthorized")

        const res = await fetch(this.url + path, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...(this.auth ? { 'Authorization': this.auth } : {})
            },
            body: JSON.stringify(json),
        })

        return res.json()
    }

    async form<D>(path: string, form: HTMLFormElement, authorized: boolean = false): Promise<APIResponse<D>> {
        if (authorized && !this.auth) throw Error("unauthorized")

        const res = await fetch(this.url + path, {
            method: "post",
            headers: {
                ...(this.auth ? { 'Authorization': this.auth } : {})
            },
            body: new FormData(form),
        })

        return res.json()
    }


    async login(username: string, password: string) {
        const res = await this.send<{ token: string }>('/api/login', 'post', {
            username, password
        })
        if (res.error)
            throw new Error(res.message)
        this.auth = res.data.token
    }
    async crearExposicion(nombre: string, descripcion: string, idiomasDisponibles: string, horas: number) {
        return await this.send('/api/crearExposicion', 'post', {
            nombre, descripcion, idiomasDisponibles, horas
        }, true)
    }
}

const api = new API('http://192.168.40.12:4000')

function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        navigate("/new_expo")
        await api.login(username, password)

        if (e.target instanceof HTMLFormElement)
            e.target.reset()
    }

    return <form onSubmit={onSubmit} className="form">
        <input className="input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="input" type="text" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="submit" type="submit">Iniciar sesión</button>
    </form>
}

interface InputProps {
    label: string;
    type: string;
    name: string;
}

const Input = ({ label, type, name }: InputProps) => (
    <label className='relative block b-1 b-gray bg-white rd-2 self-stretch'>
        <p className='absolute text-sm text-gray6 top-1 left-2'>{label}</p>
        <input
            className='h-14 px-2 pt-6 w-100% rd-2 bg-transparent'
            type={type}
            name={name}
        />
    </label>
)

interface SubmitButtonProps {
    text: string;
}

const SubmitButton = ({text}: SubmitButtonProps) => (
    <button className='bg-blue8 rd-5 px-2 py-3 text-white' type="submit">{text}</button>
)

function CrearExpoForm() {
    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        console.log(e.target)
        if (e.target instanceof HTMLFormElement) {
            await api.form('/api/crearExposicion', e.target, true)
            e.target.reset()
        }
    }

    return <form onSubmit={onSubmit} className="form">
        <h1 className='text-10 font-title'>Crear exposición</h1>
        <Input
            label="Nombre"
            type="text"
            name="nombre" />
        <Input
            label="Descripcion"
            type="text"
            name="descripcion" />
        <Input
            label="Idiomas disponibles"
            type="text"
            name="idiomasDisponibles" />
        <Input
            label="Audio"
            type="file"
            name="audio" />
        <Input
            label="Horas"
            type="number"
            name="horas" />
        <SubmitButton text="Crear expo" />
    </form>
}

const Root = () => <div>
    <Header />
    <Outlet />
</div>

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { index: true, element: <LoginForm /> },
            { path: 'new_expo', element: <CrearExpoForm /> },
        ]
    }
])

export const App = () => <RouterProvider {...{ router }} />
