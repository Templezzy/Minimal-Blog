import Image from "next/image"

export default function Card({title, desc, author, date, slug, image}: {title: string, image: string, desc: string, author: string, date: string, slug: string}) {
    return (
      <div className=" hover:scale-101 transition-all w-fit p-5 flex items-start flex-col">
        <Image src={image} alt={title} width={300} height={200} className="rounded-lg mb-4" />
            <h1><a className="text-lg" href={`/content/${slug}`}>{title}</a></h1>
            <p className="text-sm text-zinc-300">{desc}</p>
        <div className="flex items-center gap-4 mt-1">
          <p className="text-sm text-zinc-500">Author : {author}</p>
          <p className="text-sm text-zinc-300">{date}</p>
            </div>
        </div>
    )
}