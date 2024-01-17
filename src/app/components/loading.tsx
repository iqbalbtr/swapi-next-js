import Image from 'next/image'
import React from 'react'

function Loading(props: {
    width?: number | 60
}) {
    return (
        <div>
            <Image src="/loading.png" width={props.width} height={props.width} alt='loading' className='aspect-square animate-spin' />
        </div>
    )
}

export default Loading
