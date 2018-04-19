module.exports = function(app) {
  var todoList = require('../controllers/todoListController');
  var user = require('../controllers/userController');
  var forge = require('../libs/forgeApi');
  
  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
    
  // User Routes
  app.route('/users')
    .get(user.list_all_users)
    .post(user.create_a_user);


  app.route('/users/:userId')
    .get(user.read_a_user)
    .put(user.update_a_user)
    .delete(user.delete_a_user);

    
  // Calendar Routes
  app.route('/calendar')
    .get(function(req, res){
      res.render('calendar', { title: 'Express' });
    });

  // Forge 3D Model Routes
  app.route('/forge2')
    .get(function(req, res){
      var request = require("request");
      
      var options = { method: 'POST',
        url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
        headers: 
         { 'Postman-Token': 'e76f5865-5353-4ea2-b9f3-4675610fa14a',
           'Cache-Control': 'no-cache',
           'Content-Type': 'application/x-www-form-urlencoded' },
        form: 
         { client_id: process.env.FORGEID,
           client_secret: process.env.FORGEPASSWORD,
           grant_type: 'client_credentials',
           scope: 'data:read' } };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        var ores = JSON.parse(body);
        //console.log(ores.access_token)
        res.render('forge', { token: ores.access_token });
      });

    });

  app.route('/forge')
    .get(function(req, res){
      forge.getToken(function(token){
        res.render('forge', { token: token });
      });     

    });
  
  // Login Routes
  app.route('/login')
    .get(function(req, res){
      res.render('login', { title: 'Express' });
    })
    .post(user.check_a_user);
    
  // Logout Routes
  app.route('/logout')
    .get(function(req, res){
      req.session.logined = false;
      res.redirect('/');
    });
};
