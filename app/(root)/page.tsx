import HeaderBox from '@/components/ui/HeaderBox'
import RightSideBar from '@/components/ui/RightSideBar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home =async() => {
const LoggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className='home-content'>
        <header className='home-header'>
           <HeaderBox
           type="greeting"
           title="welcome"
           user={LoggedIn?.name || 'guest'}
           subtext="Access and manage your account and transactions effeciently."
           />
           <TotalBalanceBox
           accounts={[]}
           totalBanks={1}
           totalCurrentBalance={1250.50}
           />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSideBar 
      user={LoggedIn}
      transactions={[]}
      banks={[{currentBalance: 123.50}, {}]}
      />
    </section>
  )
}

export default Home