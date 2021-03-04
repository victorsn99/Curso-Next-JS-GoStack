import { GetStaticProps } from "next";

interface IProduct {
    id: string;
    title: string;
}

interface Top10Products {
    products: IProduct[];
}

export default function top10({ products }: Top10Products) {
    return (
    <div>
      <section>
        <h1>Top 10</h1>

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
    );
}

export const getStaticProps: GetStaticProps<Top10Products> = async (context) => {
    const response = await fetch('http://localhost:3333/products')
    const products = await response.json();
    
    return {
        props: {
            products
        },
        revalidate: 5,
    }
}