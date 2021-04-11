import { AxiosObservable } from '../src';
import Axios from 'axios';

setTimeout(async () => {
    let server = new AxiosObservable(
        Axios.create({
            baseURL: 'http://localhost:50000/api/v1',
            responseType: 'json',
        }),
    );

    let sub = server
        .http$<{ name: string }>({
            url: '/about',
            method: 'get',
        })
        .subscribe({
            next: (x) => {
                console.log(x.data);
            },
            error: (error) => {
                console.log('error!', error);
            },
        });
}, 0);
