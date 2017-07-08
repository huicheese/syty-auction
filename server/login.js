var utils = require('./utils.js');

exports.setApp = function(app) {
  app.post('/login', (request, response) => {
    if (!utils.isValidAuth(request.cookies.sytyAuth)) {
      if (!request.body)
        return response.status(400).send('Login form is empty')

      if (!request.body.firstName || !request.body.firstName.trim())
        return response.status(400).send('First name is empty')

      if (!request.body.lastName || !request.body.lastName.trim())
        return response.status(400).send('Last name is empty')

      if (!request.body.company || !request.body.company.trim())
        return response.status(400).send('Company is empty')

      if (!request.body.table || isNaN(request.body.table))
        return response.status(400).send('Table number is invalid')

      let authData = JSON.stringify({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            company: request.body.company,
            table: request.body.table+1
          });
      let expiry = new Date(Date.now() + app.locals.cookiesExpiration);

      console.log('Login successful for %s', authData);
      response.cookie('sytyAuth', authData, { expires: expiry });
      response.status(200).send('Login successful');
    }
    else
      response.status(200).send('User already logged in')
  })
};