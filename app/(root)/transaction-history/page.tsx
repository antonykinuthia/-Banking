import { Pagination } from '@/components/pagination';
import HeaderBox from '@/components/ui/HeaderBox'
import TransactionsTable from '@/components/ui/TransactionsTable';
import { getAccount, getAccounts } from '@/lib/actions/banks.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import React from 'react'

const TransactionHistory = async ({searchParams : { id, page}} : SearchParamProps) => {

  const currentPage = Number(page as string) || 1;

  const LoggedIn = await getLoggedInUser();

  const accounts = await getAccounts({userId: LoggedIn.$id})

  if(!accounts) return;

  const accountsData = accounts?.data; 

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId})

  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length/ rowsPerPage);

  const indexOfLastPage = currentPage * rowsPerPage;
  const indexOfFirstPage = indexOfLastPage - rowsPerPage;

  const currentTransactions = account?.transactions.slice(indexOfFirstPage, indexOfLastPage);

  return (
    <section className='transactions'>
      <div className='transactions-header'>
        <HeaderBox
        title='Transaction History'
        subtext='See your bank details and transactions'
        />
      </div>
      <div className='space-y-6'>
       <div className='transactions-account'>
           <div className='flex flex-col gap-2'>
            <h2 className='text-18px font-bold text-white'>
              {account?.data.name}
            </h2>
            <p className='text-14 text-blue-25'>
              {account?.data.officialName}
            </p>
            <p className='text-14 font-semibold tracking-[1.1px] text-white'>
              **** **** **** 
              {account?.data.mask}
            </p>
           </div>
           <div className='transactions-account-balance'>
              <p className='text-14'>
               currentBalance
              </p>
              <p className='text-24 font-bold text-center'>
               {formatAmount(account?.data.currentBalance)}
              </p>
           </div>
       </div>
       <section className='flex w-full flex-col gap-6'>
          <TransactionsTable
          transactions={currentTransactions}
          />
          {totalPages > 1 && (
            <div className='my-4'>
             <Pagination totalPages={totalPages} page={currentPage}/>
            </div>
          )}
       </section>
      </div>
    </section>
  )
}

export default TransactionHistory