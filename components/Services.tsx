const services = [
    {
        name: "Video Production",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ullam officiis, accusantium est maxime culpa nostrum eos molestiae distinctio debitis!"
    },
    {
        name: "Event Coverage",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ipsa consectetur recusandae nesciunt veniam iusto labore non, perspiciatis distinctio magni?"
    },
    {
        name: 'Photography',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis eveniet eligendi aut necessitatibus ad ullam quos voluptatibus aspernatur facilis repellendus."
    },
    {
        name: 'Editing',
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus animi enim sapiente deserunt ratione laborum corporis officia tempora laboriosam nisi."
    },
    {
        name: "Consulting",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quis iusto laboriosam illum, earum atque aperiam omnis veritatis possimus quo."
    },
    {
        name: "Training",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, perferendis ex! Vel necessitatibus quam debitis eos, libero amet delectus eaque."
    },
]
export default function Services() {
    return (
        <section id="services" className="min-h-100 w-full flex flex-col gap-16 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <h1 className={`text-5xl font-bold`}>
                Services
            </h1>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-lg font-semibold">
                {
                    services.map((service) => {
                        return (
                            <div key={`${service}`} className="bg-white text-black border rounded-lg px-8 py-8 h-40 hover:bg-white hover:text-logo hover:border-logo transition-all duration-300 hover:scale-120 flex flex-col items-center justify-center">
                                <p>
                                    {service.name}
                                </p>
                                <p>
                                    {/* {service.description} */}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}