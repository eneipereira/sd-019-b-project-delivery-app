import React from 'react';
import AdmNewUser from '../components/AdmNewUser';
import AdmListUsers from '../components/AdmUserList';
import HeaderAdmin from '../components/HeaderAdmin';

function Admin() {
  return (
    <div>
      <HeaderAdmin />
      <AdmNewUser />
      <AdmListUsers />
    </div>
  );
}

export default Admin;
