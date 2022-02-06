// create respond function for easier reusability
const respond = (request, response, status, content, type) => {
  const headers = {
    'Content-Type': type,
  };

  response.writeHead(status, headers);
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  // if xml return xml
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>This is a successful response.</message></response>';

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // if not xml respond with json
  const responseJSON = {
    message: 'This is a successful response',
  };

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 200, jsonString, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters.',
  };

  // if required params are not valid respond with missing param message
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query param set to true';
    responseJSON.id = 'badRequestMissingParam';

    // if xml return xml
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += '<message>Missing valid query parameter set to true.</message>';
      responseXML += '<id>badRequest</id></response>';

      return respond(request, response, 400, responseXML, 'text/xml');
    }

    // if not xml respond with json
    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 400, jsonString, 'application/json');
  }

  // if required params are valid
  //if xml return xml
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>This request has the required parameters.</message></response>';
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  //if not xml return json
  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 200, jsonString, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters.',
  };

   // if required params arent valid alert to missing params
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorizedMissingParam';

    //if xml return xml
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML += '<message>Missing loggedIn query parameter set to yes.</message>';
      responseXML += '<id>unauthorized</id></response>';
      return respond(request, response, 401, responseXML, 'text/xml');
    }
    //if json return json
    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 401, jsonString, 'application/json');
  }
//if params are valid 
  if (acceptedTypes[0] === 'text/xml') {
    //if xml return xml
    let responseXML = '<response>';
    responseXML += '<message>You have successfully viewed the content.</message></response>';
    return respond(request, response, 200, responseXML, 'text/xml');
  }
//if json return json
  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 200, jsonString, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
    //if xml return xml
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>You do not have access to this content.</message>';
    responseXML += '<id>forbidden</id></response>';

    return respond(request, response, 403, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };
//if json return json
  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 403, jsonString, 'application/json');
};

const internal = (request, response, acceptedTypes) => {

    //if xml return xml
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>Internal server error. Something went wrong.</message>';
    responseXML += '<id>internalError</id></response>';

    return respond(request, response, 500, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
//if json return json
  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 500, jsonString, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {

    //if xml return xml
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>A get request for this page has not been implemented yet. Check again later for updated content.</message>';
    responseXML += '<id>notImplemented</id></response>';

    return respond(request, response, 501, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'This page has not been implemented yet. Check back later for updates.',
    id: 'notImplemented',
  };
//if json return json
  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 501, jsonString, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
//if xml respond xml
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML += '<message>The page you are looking for was not found.</message>';
    responseXML += '<id>notFound</id></response>';

    return respond(request, response, 404, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'The page you are looking for does not exist.',
    id: 'notFound',
  };

//if json return json
  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 404, jsonString, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
