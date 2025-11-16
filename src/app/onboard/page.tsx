import { Header } from '@/components/dashboard/header';
import { Input } from '@/components/ui/input';
import "./onboard.css"
import { Button } from '@/components/ui/button';
import  Link  from 'next/link';
export default function Onbaording(){



    return (
        <>
        <Header />
       <div className="flex min-h-screen w-screen align-middle justify-center   flex-col bg-background pl-10">
             
             <h1 className='topog'>tell us about your self ?</h1>
            <div className=' flex flex-col justify-center align-middle form'>
                How much do you pay in electricity in a month?
                <Input className='pad' prefix='R'/>
                How much do you earn?
                <Input className='pad' prefix='R'/>

                <Button> <Link href="/create-project">Continue</Link></Button>
                <div className='circle '></div>
            </div>
        </div>
        </>
    );
}