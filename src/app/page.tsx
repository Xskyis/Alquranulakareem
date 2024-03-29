'use client'
import useSWR from 'swr'
import { Key, useEffect, useState } from 'react';
import Image from "next/image";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  const [surahNameData, setSurahNameData] = useState<any>([])
  const [surahDetailData, setSurahDetailData] = useState<any>([])
  const [surahNumber, setSurahNumber] = useState("1")

  console.log('surahNameData', surahNameData);
  console.log('surahDetailData', surahDetailData);

  // fetch data from API
  const { data, error } = useSWR('https://equran.id/api/surat', (url) => fetch(url).then(res => res.json()))

  // Fetch data detail surah
  const { data: detailData, error: detailError } = useSWR(`https://equran.id/api/surat/${surahNumber}`, (url) => fetch(url).then(res => res.json()))

  const handleClick = (nomorSurah: string) => {
    setSurahNumber(nomorSurah)
  }

  useEffect(() => {
    if (data) {
      setSurahNameData(data)
    }
  }, [data])

  useEffect(() => {
    if (detailData) {
      setSurahDetailData(detailData.ayat)
    }
  }, [detailData])

  return (
    <div className="container-fluid background-light p-5">
      <Navbar />
      <div className="main-content rounded-4 mt-2">
        <div className="d-flex justify-content-center p-5 col-lg-12 row shadow-sm">
          <div className="d-flex flex-column col-lg-3 gap-2" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            {surahNameData.map((surah: any, index: Key | null | undefined) => (
              <SurahCard
                key={index}
                nomor={surah?.nomor}
                namaSurat={surah?.nama_latin}
                arti={surah?.arti}
                handleClick={handleClick}
                surahNumber={surahNumber}
              />
            ))}
          </div>
          <div className="d-flex flex-column gap-2 col-lg-8" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            {surahDetailData.map((surah: any, index: Key | null | undefined) => (
              <SurahDetailCard
                key={index}
                nomorSurah={surah?.surah}
                ayat={surah?.nomor}
                ar={surah?.ar}
                tr={surah?.tr}
                id={surah?.idn}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Surah Card Props
type SurahCardProps = {
  nomor: string,
  namaSurat: string,
  arti: string
  surahNumber: string,
  handleClick: (nomorSurah: string) => void
}

const SurahCard = ({ nomor, namaSurat, arti, handleClick, surahNumber }: SurahCardProps) => {
  return (
    <div className={`card border-3 ${surahNumber === nomor ? 'shadow-lg' : 'shadow-sm'} ${surahNumber === nomor ? 'border-success' : 'border-none'}`} style={{ width: '14rem' }} onClick={() => handleClick(nomor)}>
      <div className="card-body">
        <div className="d-flex">
          <p className="surah-number bg-success bg-gradient">{nomor}</p>
          <h6 className="card-title"><strong>{namaSurat}</strong></h6>
        </div>
        <h6 className="card-subtitle text-body-secondary text-uppercase" style={{ paddingLeft: '41px', fontSize: '13px' }}>{arti}</h6>
      </div>
    </div>
  )
}

// Surah Detail Card Props
type SurahDetailCardProps = {
  nomorSurah: number,
  ayat: number,
  ar: any,
  tr: string,
  id: string
}

const SurahDetailCard = ({ nomorSurah, ayat, ar, tr, id }: SurahDetailCardProps) => {
  return (
    <div className="card shadow border border-none" style={{ width: '100%' }}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between mb-3">
          <span className="badge text-bg-success h-25 me-5 shadow-sm">{nomorSurah} : {ayat}</span>
          <h5 className="card-title"><strong>{ar}</strong></h5>
        </div>
        <h6 className="card-subtitle text-body-success mb-3" style={{ paddingLeft: '35px', fontSize: '13px' }}>{tr}</h6>
        <h6 className="card-subtitle text-body-secondary" style={{ paddingLeft: '35px', fontSize: '13px' }}>
          {id}
        </h6>
        <hr />
      </div>
    </div>
  )
}
