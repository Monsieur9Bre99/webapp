import { BrowserRouter, Route, Routes } from 'react-router';
import { useDisplayTypeListener } from './hooks/useDisplayTypeListener';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './pages/Home.page';
import Contact from './pages/Contact.page';
import Account from './pages/Account.page';
import Login from './pages/login/Login.page';

import Header from './components/header/Header';
import ConfirmAccount from './pages/login/Login.ConfirmAccount.page';
import NotConnected from './guard/NotConnected.guard';
import ConnectedLayout from './guard/Connected.guard';
import ForgotPassword from './pages/login/Login.ForgotPassword.page';
import UpdatePassword from './pages/login/Login.UpdatePassword.page';
import ProjectLanding from './pages/projectLanding/ProjectLanding.page';
import Dashboard from './pages/projectLanding/ProjectLanding.Dashboard.page';
import Backlog from './pages/projectLanding/ProjectLanding.Backlog.page';
import Kanban from './pages/projectLanding/ProjectLanding.Kanban.page';
import Document from './pages/projectLanding/ProjectLanding.Document.page';
import Messagerie from './pages/projectLanding/ProjectLanding.Messagerie.page';
import Parameter from './pages/projectLanding/ProjectLanding.Parameter.page';
import Toast from './prefab/Toast.prefab';
import PopUp from './prefab/PopUp.prefab';

const queryClient = new QueryClient();

function App() {
	useDisplayTypeListener();

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/contact'
						element={<Contact />}
					/>

					<Route element={<ConnectedLayout />}>
						<Route
							path='/user'
							element={<Account />}
						/>

						<Route
							path='/project/:project_id'
							element={<ProjectLanding />}>
							<Route
								index
								path='dashboard'
								element={<Dashboard />}
							/>
							<Route
								index
								path='backlog'
								element={<Backlog />}
							/>
							<Route
								index
								path='kanban'
								element={<Kanban />}
							/>
							<Route
								index
								path='file'
								element={<Document />}
							/>
							<Route
								index
								path='messagerie'
								element={<Messagerie />}
							/>
							<Route
								index
								path='parameter'
								element={<Parameter />}
							/>
						</Route>
					</Route>

					<Route element={<NotConnected />}>
						<Route
							path='/login'
							element={<Login />}
						/>
						<Route
							path='/login/confirm/:token'
							element={<ConfirmAccount />}
						/>
						<Route
							path='/forgot_password'
							element={<ForgotPassword />}
						/>
						<Route
							path='/forgot_password/:url'
							element={<UpdatePassword />}
						/>
					</Route>
				</Routes>
				<Toast />
				<PopUp />
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
