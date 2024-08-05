import axios from "axios";

import { BITQUERY_V1_KEY } from "../config/apiKeys";

export const callQuery = async (type: string, query: string) => {
    try {
        let url = 'https://graphql.bitquery.io';

        if(type === 'eap') {
            url = 'https://streaming.bitquery.io/eap'
        }
        const data = JSON.stringify({ query: query })
        const config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': BITQUERY_V1_KEY,
                "mode": "*"
            },
            data: data,
        } as any;
        const response = await axios(config);

        return response;
    } catch (err) {
        console.error(err);
        return null;
    }
}

