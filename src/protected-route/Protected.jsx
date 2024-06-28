    import React, { useEffect } from 'react'
    import { useNavigate } from 'react-router-dom';

    function Protected({Comp}) {


        const navigate = useNavigate();
        useEffect(() => {
          

            if(!localStorage.getItem('isUserLogin')){
                navigate('/login');
                return;
            }
        },[]);

        

        return (
            <div>

                <Comp />

            </div>
        )
    }

    export default Protected