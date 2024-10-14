import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import {Candidate} from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
const [candidate, setCandidate] = useState<Candidate | null>(null);
 const [error, setError] = useState<string | null>(null);
const [username, setUsername] = useState<string>('octocat');


        const fetchRandomCandidate = async () => {
            try {
                const data = await searchGithub();
                if (data.lengh > 0) {
                  const randomCandidate = Math.floor(Math.random() * data.length);
                  
                setCandidate(data[randomCandidate]);
                console.log()
                } else {
                  setError('No Candidates Found');
                }
            } catch (err) {
                setError('Candidate not found');
            }
        };

    //   const handleSearch = async () => {
    //     setError(null);
    //     try {
    //         const user = await searchGithubUser(username);
    //         if (user && user.login) {
    //             setCandidate(user);
    //         } else {
    //             setError('User not found');
    //         }
    //     } catch (err) {
    //         setError('Error fetching user');
    //     }
    // };

    useEffect(() => {
        fetchRandomCandidate();
    }, []);



  return (
  <div>
    <h1>Candidate Search</h1>
    {candidate ? (
            <div>
                <h2>{candidate.name}</h2>
                <img src={candidate.avatar_url} alt={candidate.name} width={100}/>
            </div>
            ) : (
                <h2>Loading...</h2>
            )}
  </div>
  );
  
};

export default CandidateSearch;
