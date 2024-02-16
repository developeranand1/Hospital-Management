// middleware/authorize.js
function authorize(roles) {
  return (req, res, next) => {
    const userRole = req.user.role; // This line is causing the error
    console.log('User Role:', userRole);

    if (!roles.includes(userRole)) {
      console.log('Unauthorized Access');
      return res.status(403).json({ message: 'Unauthorized' });
    }

    console.log('Authorized Access');
    next();
  };
}


function authorize(roles) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!userRole || !roles.includes(userRole.toString())) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
}


function authorize(permissions) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!userHasPermissions(userRole, permissions)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
}

function userHasPermissions(userRole, requiredPermissions) {
  // Implement your logic to check if the user's role has the required permissions
  // You may use a more sophisticated permission system or RBAC (Role-Based Access Control)
  return requiredPermissions.every(permission => userRole.includes(permission));
}

module.exports = authorize;
