import { Title } from '../styles/pages/Home';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import {Document} from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';
import Link from 'next/link'

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {

  return (
    <div>
      <SEO title="DevCommerce, your best e-commerce!" shouldExcludeTitleSuffix/> 
      <section>
        <Title>Products</Title>
        <button><Link href={`/search`}>Pesquisar</Link></button>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      
    </div>
    
  )
}

// usar o getserversideprops apenas quando uma informação dinâmica precisa estar disponivel em motores de busca
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}
