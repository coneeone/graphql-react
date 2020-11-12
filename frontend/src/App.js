import logo from './logo.svg';
import './App.css';

import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  gql, 
  useQuery 
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

const LAUNCHES = gql`query GetLaunches {
  launches(limit: 5) {
    id
    launch_date_utc
    launch_success
    mission_name
    details
    rocket {
      rocket {
        name
      }
    }
  }
}`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <ApolloProvider client={client}>
        <Launches />
      </ApolloProvider>
    </div>
  );
}

function Launches () {
  const { loading, error, data } = useQuery(LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data)

  return (
    <>
      <h1>5 SpaceX Launches</h1>
      { data.launches.map(el => {
        return (
          <section key={ el.id }>
            <h2>{ el.mission_name }</h2>
            <p><b>Rocket : </b>{ el.rocket.rocket.name }</p>
            <p><b>Launch success : </b>{ el.launch_success }</p>
            <p><b>Launch date : </b>{ new Date(el.launch_date_utc).toLocaleDateString('fr-FR') }</p>
            <b>Details : </b><p>{ el.details || 'no details' }</p>
          </section>
        )
      })}
    </>

    )

}

export default App;
