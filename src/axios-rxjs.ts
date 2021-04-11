import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import * as Http from 'http';
import * as Https from 'https';
import { Observable } from 'rxjs';

export class AxiosObservable {
    /**
     *
     */
    private _axios: AxiosInstance;

    /**
     *
     */
    private _http = new Http.Agent({
        keepAlive: true,
    });

    /**
     *
     */
    private _https = new Https.Agent({
        keepAlive: true,
    });

    constructor(axios?: AxiosInstance) {
        this._axios = axios || Axios;
    }

    /**
     *
     * @param config
     * @returns
     */
    public http$<T = any>(config: AxiosRequestConfig) {
        return this.createHttpObservable<T>(config);
    }

    /**
     *
     * @param config
     * @returns
     */
    private createHttpObservable<T = any>(config: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        let _cancelTokenSource: CancelTokenSource = Axios.CancelToken.source();
        return new Observable<AxiosResponse<T>>((observer) => {
            this._axios({
                httpAgent: this._http,
                httpsAgent: this._https,
                ...config,
                cancelToken: _cancelTokenSource.token,
            })
                .then((response) => {
                    observer.next(response);
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                });

            return () => _cancelTokenSource.cancel();
        });
    }
}

export namespace AxiosObservable {
    export type TMethod = 'get' | 'post' | 'put' | 'delete';
}
