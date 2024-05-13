const conn = require("../connections/db");
module.exports  = {
    
  createUser: (req, res) => {
    const query = "CALL setUser(?,?,?,?,?,?,?,?,?,?,?)";
    const values = [
      req.body.fullname,
      req.body.gender,
      req.body.Username,
      req.body.type,
      req.body.email,
      req.body.mobile,
      req.body.address,
      req.body.region,
      req.body.password,
      true,
      req.file ? req.file.filename : "null",
    ];

    var connection=  conn.initialize()
    connection.query(query, values, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });
      return res.send({
        hasError: false,
        message:
          "Successfully Created With The User " +
          req.body.username +
          " Please return login",
        FILE: req.file,
      });
    });
  },
  getAllUsers: (req,res)=>{
      const query = "SELECT *FROM users";
 var connection=  conn.initialize()
      connection.query(query, (err, data) => {
        if (err)
          return res.send({
            hasError: true,
            error: "Error Occured",
            message: err.message,
            full_error: err.code,
          });

        return res.send({
          hasError: false,
          message: "",
          data: data,
        });
      });
  },
  deleteUser: (req,res)=>{
    const query = "DELETE FROM users where ID=?";
 var connection=  conn.initialize()
    connection.query(query, [req.params.id], (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });

      return res.send({
        hasError: false,
        message: "User has been removed successfully",
      });
    });
  },
  findUserCredentials: (req,res)=>{
    const query = "SELECT *FROM users WHERE `Email`=? and `Password`=?";
    const values = [req.params.email, req.params.password];

     var connection=  conn.initialize()
    connection.query(query, values, (err, data) => {
      if (err)
        return res.send({
          hasError: true,
          error: "Error Occured",
          message: err.message,
          full_error: err.code,
        });

      return res.send({
        hasError: false,
        message: "",
        userData: data,
      });
    });
  },

  fetchOneUser: (req,res)=>{
      const query = "SELECT *FROM users WHERE `ID`=?";
      const values = [req.params.id];
 var connection=  conn.initialize()
      connection.query(query, values, (err, data) => {
        if (err)
          return res.send({
            hasError: true,
            error: "Error Occured",
            message: err.message,
            full_error: err.code,
          });

        return res.send({
          hasError: false,
          message: "",
          userData: data,
        });
      });
  },
  searchUser: (req,res)=>{
     const query = "CALL searchUser(?)";
     const values = [req.params.user];
 var connection=  conn.initialize()
     connection.query(query, values, (err, data) => {
       if (err)
         return res.send({
           hasError: true,
           error: "Error Occured",
           message: err.message,
           full_error: err.code,
         });

       return res.send({
         hasError: false,
         message: "",
         userData: data,
       });
     });
  },
  updateUser:  (req,res)=>{
      const query =
        "UPDATE users SET FullName=?, Username=?,`Email`=?, Region=?, Address=?, Mobile=? ,`Password`=?, Profile=? WHERE ID=?";
      const values = [
        req.body.FullName,
        req.body.Username,
        req.body.Email,
        req.body.Region,
        req.body.Address,
        req.body.Mobile,
        req.body.Password,
        req.file ? req.file.filename : req.body.Profile,
        req.body.ID,
      ];
       var connection =  conn.initialize();
      connection.query(query, values, (err, data) => {
        if (err)
          return res.send({
            hasError: true,
            error: "Error Occured",
            message: err.message,
            full_error: err.code,
          });

        const query = "SELECT *from users WHERE ID=?";
        const values = [req.body.ID];
        conn.initialize().query(query, values, (err, data) => {
          if (err)
            return res.send({
              hasError: true,
              error: "Error Occured",
              message: err.message,
              full_error: err.code,
            });
          return res.send({
            hasError: false,
            body: req.body.type,
            message: "Your Profile Has been updated Successfully🔥",
            userData: data,
          });
        });
      });
  }
};
