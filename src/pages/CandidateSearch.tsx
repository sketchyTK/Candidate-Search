import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import {Candidate} from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
const [candidate, setCandidate] = useState<Candidate | null>(null);
const [saveCandidates, setSavedCandidates] = useState<Candidate[]>([]);
const [loading, setLoading] =useState(false);
const [outOfCandidates, stopCandidates] =useState(false);

  useEffect(() => {
    fetchRandomCandidate();
  }, []);

  useEffect(() => {
    const save = localStorage.getItem('savedCandidates');
    if (save) {
      setSavedCandidates(JSON.parse(save));
    }
}, []);

  const fetchRandomCandidate = async () => {
    setLoading(true);
    const users = await searchGithub();
    if (users.length === 0) {
        stopCandidates(true);
    }
    else {
      const user = users[0];
      const candidateDetails: Candidate = await searchGithubUser(user.login);
      setCandidate(candidateDetails);
    }
    setLoading(false);
  };

const saveCandidateButton = () => {
  if (candidate) {
    const updateCandidateList = [...saveCandidates, candidate];
    setSavedCandidates(updateCandidateList);
    localStorage.setItem('savedCandidates', JSON.stringify(updateCandidateList));
  }
};

const hideCandidateButton = () => {
  fetchRandomCandidate();
};

  return (
  <div>
    <h1>Candidate Search</h1>
    {loading ? (
          <h2>Loading...</h2>
      ) : outOfCandidates ? (
        <h2>No Candidates Available</h2>
      ) : candidate ? (
            <div>
                <h2>{candidate.name || 'Not Available'}</h2>
                <img src={candidate.avatar_url} alt={candidate.name} width="200" height="200"/>
                <p>Location: {candidate.location || 'Not Available'}</p>
                <p>Email: <a href={`mailto:${candidate.email || 'Not Available'}`}>{candidate.email || 'Not Available'}</a></p>
                <p>GitHub URL: <a href={`${candidate.html_url || 'Not Available'}`} target="_blank">{candidate.html_url || 'Not Available'}</a></p>
                <p>Company: {candidate.company || 'Not Available'}</p>
                <p>Bio: {candidate.bio || 'Not Available'}</p>
                <div>
                  <button onClick={saveCandidateButton}>+</button>
                  <button onClick={hideCandidateButton}>-</button>
                </div>
            </div>
            ) : (
              <h2>No Candidate to Display</h2>
            )
          } 
  </div>
  );
  
};

export default CandidateSearch;
