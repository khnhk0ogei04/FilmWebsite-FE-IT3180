import React from 'react';
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import AlertService from './alert/alertService';  
import { LoginComponent } from './components/login/LoginComponent';
import { RegisterComponent } from './components/register/RegisterForm';
import AdminLayout from './components/admin/layout/adminLayout';
import { AdminDashboard } from './components/admin/dashboard/adminDashboard';
import AdminAccountInfo from './components/admin/adminAccountInfo/adminAccountInfo';
import { ChangePasswordComponent } from './components/changePassword/changePassword';
import { ResetPassword } from './components/resetPassword/ResetPassword';
import { MovieDetail } from './components/admin/movies/movieDetail';
import { CategoriesList } from './components/admin/categories/Categories';
import { CategoryDetail } from './components/admin/categories/CategoryDetail';
import { AddNewMovie } from './components/admin/movies/addNewMovie';
import { AddNewCategory } from './components/admin/categories/addNewCategory';
import { UserList } from './components/admin/users/userList';
import { UserDetailInfo } from './components/admin/users/userDetailInfo';
import { UserEdit } from './components/admin/users/userEdit';
import { UserDashboard } from './components/user/UserDashboard/UserDashboard';
import { MovieStatistics } from './components/admin/statistics/MovieStatistics';
import { MovieStatisticsDetail } from './components/admin/statistics/MovieStatisticsDetail';
import { ScheduleDetail } from './components/admin/schedule/ScheduleDetail';
import { Schedules } from './components/admin/schedule/Schedules';
import { UserLayout } from './components/user/layout/UserLayout';
import ProtectedRoute from './ProtectedRoute';
import { AddSchedule } from './components/admin/schedule/AddSchedule';
import { ListDiscount } from './components/admin/discount/ListDiscount';
import { ClientListDiscount } from './components/user/discount/ListDiscount';
import { AddDiscount } from './components/admin/discount/AddDiscount';
import { FilmDetailPage } from './components/user/ListFilmActive/FilmDetail';
import CinemaList from './components/user/cinema/CinemaList';
import { BookingPage } from './components/user/booking/BookingPage';
import { BookingListPage } from './components/user/booking/BookingListPage';
import { ConfirmResetPassword } from './components/resetPassword/ConfirmResetPassword';
import { Donate } from './components/user/donate/Donate';
import { CategoriesListUser } from './components/user/categories/CategoriesList';
import { CategoriesDetailUser } from './components/user/categories/CategoriesDetailUser';
import { NotFoundPage } from './components/user/404NotFound/404NotFound';

function App() {
  const isAuthenticated = () => !!localStorage.getItem('token');
  const getRole = () => localStorage.getItem('role');
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginComponent />} />
        <Route path='/register' element={<RegisterComponent/>} />
        <Route path='/change-password' element={<ChangePasswordComponent />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/reset-password/:token' element={<ConfirmResetPassword />} />
        <Route path='/' element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        <Route path="/admin" element={
          <ProtectedRoute roleRequired="ROLE_ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="movies" element={<AdminDashboard />} />
          <Route path="movies/add" element={<AddNewMovie />} />
          <Route path="movies/:movieId" element={<MovieDetail />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="categories/add" element={<AddNewCategory />} />
          <Route path="categories/:categoryId" element={<CategoryDetail />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:id" element={<UserDetailInfo />} />
          <Route path="users/edit/:id" element={<UserEdit />} />
          <Route path="statistics" element={<MovieStatistics />} />
          <Route path="statistics/:id" element={<MovieStatisticsDetail />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="schedules/:id" element={<ScheduleDetail />} />
          <Route path="schedules/add" element={<AddSchedule />} />
          <Route path="account" element={<AdminAccountInfo />} />
          <Route path="discount" element={<ListDiscount />} />
          <Route path="discount/add" element={<AddDiscount />} />
          <Route path="logout" element={<Navigate to="/login" />} />
        </Route>
        <Route path="/user" element={
          <ProtectedRoute roleRequired="ROLE_USER">
            <UserLayout />
          </ProtectedRoute>
        }>
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="donate" element={<Donate />} />
          <Route path="movies/:movieId" element={<FilmDetailPage />} /> 
          <Route path="categories" element={<CategoriesListUser />} />
          <Route path="categories/:categoryId" element={<CategoriesDetailUser />} />
          <Route path="discounts" element={<ClientListDiscount />} />
          <Route path="cinemas" element={<CinemaList />} />
          <Route path="bookings" element={<BookingListPage />} />
          <Route path="booking/:scheduleId" element={<BookingPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
