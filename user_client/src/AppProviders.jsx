import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRecoilValue } from 'recoil';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { LoginPage, HomePage, DepositPage, DetailsPage, RegisterPage, MySharePage, WithdrawPage, ProfilePage, AdminPage, CheckoutPage } from './page';
import getCurrentUser from './helpers/currentUser';
import isExpired from './helpers/expired';
import UserDataProvider from './context/currentUser';
import checkIsAdmin from './helpers/verifyAdmin';
import Footer from './layout/footer';
import Sidebar from './layout/sidebar';
import { toggleSidebar } from './lib/atoms';
import { WalletPage } from './page/Secure';


const AppProviders = () => {
    const useToggleSidebar = useRecoilValue(toggleSidebar);

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <UserDataProvider>
                <div className='w-full absolute min-h-[18.75rem] bg-[#2e6a5c]'></div>
                <div className={`fixed inset-y-0 flex-wrap transition-transform xl:w-[16rem]  xl:ml-6 xl:left-0 ${!useToggleSidebar ? 'xl:translate-x-0 -translate-x-full' : 'translate-x-0 ml-2'}  block z-30  my-4 duration-200 text-gray-700`}>
                    <Sidebar />
                </div>
                <main className='relative h-full  min-h-screen xl:ml-[17rem] p-4 xl:p-8'>
                    <Routes>
                        <Route path='/login' element={
                            <CheckAuth>
                                <LoginPage />
                            </CheckAuth>
                        } />
                        <Route path='/register' element={
                            <CheckAuth>
                                <RegisterPage />
                            </CheckAuth>
                        } />

                        <Route path='/licenses' element={
                            <RequireAuth>
                                <MySharePage />
                            </RequireAuth>
                        } />
                        <Route path='/deposit-page' element={
                            <RequireAuth>
                                <DepositPage />
                            </RequireAuth>
                        } />
                        <Route path='/wallet' element={
                            <RequireAuth>
                                <WalletPage />
                            </RequireAuth>
                        } />

                        <Route path='/checkout' element={
                            <RequireAuth>
                                <CheckoutPage />
                            </RequireAuth>
                        } />

                        <Route path='/withdraw-page/' element={
                            <RequireAuth>
                                <WithdrawPage />
                            </RequireAuth>
                        } />

                        <Route path='/my-account/edit-account' element={
                            <RequireAuth>
                                <ProfilePage />
                            </RequireAuth>
                        } />

                        <Route path='/company/:id'
                            element={<DetailsPage />}
                        />

                        <Route path='/admin/dashboard' element={
                            <RequireAuth>
                                <RequireAdmin>
                                    <AdminPage />
                                </RequireAdmin>
                            </RequireAuth>
                        } />

                        <Route path='/' element={
                            <HomePage />
                        } />

                    </Routes>
                    <ReactQueryDevtools initalIsOpen={false} position='top-right' />
                </main>
                <div>
                    <Footer />
                </div>

            </UserDataProvider>
        </QueryClientProvider>
    );
};

const RequireAuth = ({ children }) => {
    const location = useLocation();
    if (isExpired()) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return children;
};

const RequireAdmin = ({ children }) => {
    const location = useLocation();
    if (!checkIsAdmin()) {
        return <Navigate to='/' state={{ from: location }} replace />;
    }

    return children;
};

const CheckAuth = ({ children }) => {
    const auth = getCurrentUser();
    const location = useLocation();
    if (auth && !isExpired()) {
        return <Navigate to='/' state={{ from: location }} replace />;
    }

    return children;
};

export default AppProviders;
