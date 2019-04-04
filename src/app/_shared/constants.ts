//URL Backend Monolitico
export const HOST_BACKEND = `http://localhost:8080`;
export const HOST_BACKEND_ = `http://loadbalancercursoaws-198220137.us-east-1.elb.amazonaws.com`;
//Cliente ID configurado en cognito
export const CLIENT_ID_ = "9sfudpk36tutfdktbk1855bbd";
export const CLIENT_ID = "6o913hiuh8bl9kelqstisvavmr";
//URL Cognito configurado
export const DOMAIN_AUTH_ = `https://security-forseti.auth.us-east-1.amazoncognito.com`;
export const DOMAIN_AUTH = `https://domain-secure-course.auth.us-east-1.amazoncognito.com`;
export const URL_LOGOUT_AWS = `${DOMAIN_AUTH}/logout?response_type=token&client_id=${CLIENT_ID}&redirect_uri=`;

export const TIME_UPDATE_GEOLOCALIZATION = 60000;
export const RADIO = 0.029;
export const ZOOM = 16;
export const TOKEN_NAME = "token";
export const PARAM_USUARIO = "user";