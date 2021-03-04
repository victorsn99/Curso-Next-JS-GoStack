import { Title } from '../styles/pages/Home';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }) {
  async function handleSum() {
    const { sum } = (await import('../lib/math')).default; //import dinâmico

    alert(sum(3, 5));
  }

  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
    
  )
}

// usar o getserversideprops apenas quando uma informação dinâmica precisa estar disponivel em motores de busca
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended')
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}
