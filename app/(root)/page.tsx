import HeaderBox from '@/components/ui/HeaderBox'
import RecentTransactions from '@/components/ui/RecentTransactions';
import RightSideBar from '@/components/ui/RightSideBar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/banks.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home =async({ searchParams: { id, page}}: SearchParamProps) => {

const currentPage = Number(page as string) || 1;

const LoggedIn = await getLoggedInUser();

const accounts = await getAccounts({userId: LoggedIn.$id})

if(!accounts) return;

const accountsData = accounts?.data; 

const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

const account = await getAccount({ appwriteItemId})



  return (
    <section className="home">
      <div className='home-content'>
        <header className='home-header'>
           <HeaderBox
           type="greeting"
           title="welcome"
           user={LoggedIn?.firstName || 'guest'}
           subtext="Access and manage your account and transactions effeciently."
           />
           <TotalBalanceBox
           accounts={accountsData}
           totalBanks={accounts?.totalBanks}
           totalCurrentBalance={accounts?.totalCurrentBalance}
           />
        </header>
        <RecentTransactions
        accounts={accountsData}
        transactions={account?.transactions}
        appwriteItemId={appwriteItemId}
        page={currentPage}
        />
      </div>
      <RightSideBar 
      user={LoggedIn}
      transactions={account?.transactions}
      banks={accountsData?.slice(0,2)}
      />
    </section>
  )
}

export default Home