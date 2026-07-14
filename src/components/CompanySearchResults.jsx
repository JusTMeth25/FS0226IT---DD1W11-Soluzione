import { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import Job from './Job'
import { useNavigate, useParams } from 'react-router-dom'

const CompanySearchResults = () => {
  const [jobs, setJobs] = useState([])
  const params = useParams()
  const navigate = useNavigate()

  const baseEndpoint =
    'https://strive-benchmark.herokuapp.com/api/jobs?company='

  useEffect(() => {
    getJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getJobs = async () => {
    try {
      const response = await fetch(baseEndpoint + params.companyName)
      if (response.ok) {
        const { data } = await response.json()
        setJobs(data)
      } else {
        alert('Error fetching results')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1>Jobs at {params.companyName}</h1>
          <Button onClick={() => navigate('/')}>Home</Button>
        </Col>

        <Col xs={10} className="mx-auto mb-5">
          {jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default CompanySearchResults
