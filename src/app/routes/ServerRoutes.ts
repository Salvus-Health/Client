import { DeployRoutes } from "./DeployRoutes";

/*--------------------------------------------------------------------------------------
|	ServerRoutes Module: Created by Jordi Hernandez on 10/26/2018.
|---------------------------------------------------------------------------------------
|   Description:
|
---------------------------------------------------------------------------------------*/

export const enum ServerRoutes {
  // register = 'http://localhost:9000/users/',
  register = 'https://salvus-server.herokuapp.com/users/',
  // login = 'http://localhost:9000/authenticate',
  login = 'https://salvus-server.herokuapp.com/authenticate',
  // getDoctors = 'http://localhost:9000/doctors',
  getDoctors = 'https://salvus-server.herokuapp.com/doctors',
}
