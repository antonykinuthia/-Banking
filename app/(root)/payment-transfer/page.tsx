import PaymentTransferForm from '@/components/PaymentTransferForm'
import HeaderBox from '@/components/ui/HeaderBox'
import { getAccounts } from '@/lib/actions/banks.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const payment = async () => {

const LoggedIn = await getLoggedInUser();

const accounts = await getAccounts({userId: LoggedIn.$id})

if(!accounts) return;

const accountsData = accounts?.data; 
  return (
    <section className='payment-transfer'>
      <HeaderBox
      title='Payment Transfer'
      subtext='Please Provide any specific details or notes related to the payment transfer'
      />
      <section className='size-full pt-5'>
       <PaymentTransferForm
       accounts={accountsData}
       />
      </section>
    </section>
  )
}

export default payment