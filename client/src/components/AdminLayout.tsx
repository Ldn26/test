import React from 'react'
import AdminSideBar from './AdminSideBar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden w-full" style={{ background: '#f5f0ea' }}>
      <AdminSideBar />
      <div className="flex-1 mt-8 p-2 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout