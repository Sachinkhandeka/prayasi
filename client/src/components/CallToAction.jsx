import { Button } from "flowbite-react";

export default function CallToAction() {
    return (
        <>
          <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center" >
            <div className="flex-1 flex justify-center items-center flex-col" >
                <h2 className="text-2xl font-mono left-4 font-bold mb-4" >
                    Want to know more about our prayasi blog comminity?
                </h2>
                <p className="text-md text-slate-500 p-3" >
                    Welcome to PrayasiBlog, your destination for insightful articles on diverse topics ranging from technology and travel to health and sustainability.
                    Explore our platform to stay informed and inspired!
                </p>
                <Button gradientDuoTone={"purpleToPink"} className="rounded-tl-xl rounded-bl-none"  >
                    <a href="/about" target="_blank" rel="noopener noreferer" >Know about us</a>
                </Button>
            </div>
            <div className="p-7 flex-1" >
                <img src="https://img.freepik.com/free-photo/toy-bricks-table-with-word-blog_144627-47465.jpg" alt="blog_img" />
            </div>
          </div>
        </>
    )
}