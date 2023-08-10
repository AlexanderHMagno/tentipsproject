'use client';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import useSWR from 'swr'




const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})


const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
    }
    /*
    * Quill editor formats
    * See https://quilljs.com/docs/formats/
    */
    const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    ]

    const fetcher = (url:string) => fetch(url).then((res) => res.json());
    
    export default function Home({params}:any) {
        
        const { data, error, isLoading } = useSWR(`http://localhost:3000/api/entries/${params.id}`, fetcher)
 
        if (error) return <div>failed to load</div>
        if (isLoading) return <div>loading...</div>

   

   
   
        return <ReactQuill modules={modules} value={data.content} formats={formats} theme="snow" />
    }