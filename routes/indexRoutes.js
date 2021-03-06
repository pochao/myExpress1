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
  app.route('/show3d')
    .get(function(req, res){
      forge.getToken(function(token){
        res.render('show3d', { token: token });
      });     

    });

  // Assets Routes
  app.route('/assets')
    .get(function(req, res){
      res.render('assets', { title: 'Express' });
    });

  // Asset Add Routes
  app.route('/asset/add')
    .get(function(req, res){
      res.render('assets_add', { title: 'Express' });
    });

  // Drawing Routes
  app.route('/drawing')
    .get(function(req, res){
      res.render('drawing', { title: 'Express' });
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
