import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface IProduct {
    id: string;
    title: string;
}

interface CategoryProps {
    products: IProduct[];
}


export default function Categories({ products }: CategoryProps) {
    const router = useRouter();

    if (router.isFallback) {
      return <p>Loading...</p>
    }

    return (
      
      <div>
      <section>
        <h1>{router.query.slug}</h1>

        <ul>
          {products.map(top10 => {
            return (
              <li key={top10.id}>
                {top10.title}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
    )
  }

//gerar paginas dinamicas e estaticas ao mesmo tempo

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`http://localhost:3333/categories`)
    const categories = await response.json();

    const paths = categories.map(category => {
        return {
            params: { slug: category.id},
        }
    })
    
    return {
        paths, //caminhos (nesse caso categorias)
        fallback: true, //atualiza as informações de páginas estáticas
    }
}
  

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
    const { slug } = context.params;
    
    const response = await fetch(`http://localhost:3333/products?category_id=${slug}`)
    const products = await response.json();
    
    return {
        props: {
            products
        },
        revalidate: 60,
    }
}