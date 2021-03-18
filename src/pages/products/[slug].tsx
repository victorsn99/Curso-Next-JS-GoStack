import { useRouter } from 'next/router';
import { useState } from 'react';
import AddToCartModal from '@/components/AddToCartModal';
import dynamic from 'next/dynamic';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';
import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '@/lib/prismic';

interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {
    const router = useRouter();

    if (router.isFallback) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>
      

        <div dangerouslySetInnerHTML= {{ __html: PrismicDOM.RichText.asText(product.data.description)}}></div>

        <img src={product.data.thumbnail.url} alt="Produto"/>

        <p>Price: ${product.data.price}</p>
      </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //caminhos (nesse caso categorias)
    fallback: true, //atualiza as informações de páginas estáticas
  }
}
  

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});
      
  return {
    props: {
      product
    },
    revalidate: 5,
  }
}
  