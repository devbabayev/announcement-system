import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Brauzerin yaddaşından token-i (giriş kartını) yoxlayırıq
  const token = localStorage.getItem('token');

  // Əgər token yoxdursa (yəni adam giriş etməyibsə), onu dərhal Login səhifəsinə atırıq
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Əgər token varsa, icazə veririk ki, getmək istədiyi səhifə (children) açılsın
  return children;
};

export default ProtectedRoute;