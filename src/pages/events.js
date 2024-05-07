import React,{useEffect} from "react"
import { get } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth'


function EventsPage(){
    useEffect(() => {
        fetchEvents();
    }, []);
    const fetchEvents = async () => {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken

        try {
            const restOperation = get({ 
              apiName: 'TestAPI',
              path: '/test',
              options: {
                headers: {
                  Authorization: token
                }
              }
            });
            const response = await restOperation.response;
            console.log('GET call succeeded: ', response);
          } catch (error) {
            console.log('GET call failed: ', error);
          }
    }
    return (
        <>
        
        </>
    )
}

export default EventsPage