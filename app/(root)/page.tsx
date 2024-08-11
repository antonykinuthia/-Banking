import HeaderBox from '@/components/ui/HeaderBox'
import RightSideBar from '@/components/ui/RightSideBar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import React from 'react'

const Home = () => {
  const loggedIn = {firstName: 'Antony', lastName: 'Njenga', email: 'somethingemaily@gmail.com'};

  return (
    <section className="home">
      <div className='home-content'>
        <header className='home-header'>
           <HeaderBox
           type="greeting"
           title="welcome"
           user={loggedIn?.firstName || 'guest'}
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
      user={loggedIn}
      transactions={[]}
      banks={[{currentBalance: 123.50}, {}]}
      />
    </section>
  )
}

export default Home