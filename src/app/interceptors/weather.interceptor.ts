import { HttpInterceptorFn } from '@angular/common/http';

export const weatherInterceptor: HttpInterceptorFn = (req, next) => {

  const cloneReq = req.clone({
    headers: req.headers.set('X-RapidAPI-Key', '558e1e1a89mshc08b69ac7a4c3ddp1c37f4jsnc7e6c9c51bb6')
    .set('X-RapidAPI-Host', 'open-weather13.p.rapidapi.com')
  })

  return next(cloneReq);
};
