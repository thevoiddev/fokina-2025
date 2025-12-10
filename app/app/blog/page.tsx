"use client"

import { useState } from "react"
import { Calendar, User, ArrowRight, Search } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Почему важно пить достаточно воды?",
    excerpt:
      "Вода составляет около 60% нашего тела и участвует во всех жизненно важных процессах. Узнайте, как правильное потребление воды влияет на ваше здоровье.",
    content:
      "Вода - основа жизни. Она помогает регулировать температуру тела, транспортировать питательные вещества, выводить токсины и поддерживать все функции организма...",
    author: "Команда FOKINA",
    date: "2025-01-15",
    category: "Здоровье",
    image: "/water-health-hydration.jpg",
    readTime: "5 мин",
  },
  {
    id: 2,
    title: "10 способов пить больше воды",
    excerpt: "Если вам сложно выпивать дневную норму воды, попробуйте эти простые и эффективные стратегии.",
    content: "Многие люди забывают пить воду в течение дня. Вот 10 проверенных способов увеличить потребление воды...",
    author: "Анна Фокина",
    date: "2025-01-10",
    category: "Советы",
    image: "/drinking-water-tips-glass.jpg",
    readTime: "4 мин",
  },
  {
    id: 3,
    title: "Мой путь к здоровому образу жизни",
    excerpt: "Личный опыт основательницы FOKINA о том, как привычка пить воду изменила её жизнь.",
    content:
      "Всё началось с простого решения - начать отслеживать потребление воды. Через месяц я заметила удивительные изменения...",
    author: "Анна Фокина",
    date: "2025-01-05",
    category: "Личный опыт",
    image: "/healthy-lifestyle-woman.jpg",
    readTime: "7 мин",
  },
  {
    id: 4,
    title: "Вода и спорт: что нужно знать",
    excerpt: "Как правильно пить воду до, во время и после тренировки для максимальной эффективности.",
    content: "Правильная гидратация критически важна для спортивных результатов. Узнайте, сколько воды нужно пить...",
    author: "Команда FOKINA",
    date: "2024-12-28",
    category: "Спорт",
    image: "/sports-fitness-water-bottle.jpg",
    readTime: "6 мин",
  },
  {
    id: 5,
    title: "Мифы о воде: что правда, а что нет",
    excerpt: "Разбираем популярные мифы о питьевой воде и узнаем, что говорит наука.",
    content: "Существует множество мифов о воде: 8 стаканов в день, вода во время еды, холодная vs тёплая вода...",
    author: "Команда FOKINA",
    date: "2024-12-20",
    category: "Наука",
    image: "/water-science-facts.jpg",
    readTime: "5 мин",
  },
  {
    id: 6,
    title: "Как я похудела на 10 кг благодаря воде",
    excerpt: "История пользователя о том, как простая привычка помогла достичь цели.",
    content: "Меня зовут Ксения, и я хочу поделиться своей историей. Год назад я весила на 10 кг больше...",
    author: "Ксения М.",
    date: "2024-12-15",
    category: "Истории успеха",
    image: "/weight-loss-success-woman.jpg",
    readTime: "8 мин",
  },
]

const categories = ["Все", "Здоровье", "Советы", "Личный опыт", "Спорт", "Наука", "Истории успеха"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Все")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<(typeof blogPosts)[0] | null>(null)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "Все" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (selectedPost) {
    return (
      <div className="p-4 md:p-8">
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#1E2A38] transition-colors mb-6"
        >
          <ArrowRight className="rotate-180" size={20} />
          Назад к блогу
        </button>

        <article className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
            <img
              src={selectedPost.image || "/placeholder.svg"}
              alt={selectedPost.title}
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-[#C4E538] text-[#1E2A38] text-sm font-medium rounded-full">
                  {selectedPost.category}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(selectedPost.date).toLocaleDateString("ru-RU")}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <User size={14} />
                  {selectedPost.author}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-[#1E2A38] mb-4">{selectedPost.title}</h1>

              <p className="text-gray-600 leading-relaxed mb-6">{selectedPost.excerpt}</p>

              <div className="prose prose-lg max-w-none text-gray-700">
                <p>{selectedPost.content}</p>
                <p className="mt-4">
                  Продолжение статьи... Здесь могла бы быть полная версия статьи с подробной информацией, примерами,
                  исследованиями и практическими советами по теме.
                </p>
                <h3 className="text-xl font-bold text-[#1E2A38] mt-6 mb-3">Ключевые выводы</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Пейте воду регулярно в течение дня</li>
                  <li>Слушайте свой организм и его потребности</li>
                  <li>Используйте трекер для формирования привычки</li>
                  <li>Не забывайте про качество воды</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E2A38]">Блог</h1>
        <p className="text-gray-500 mt-1">Советы, истории и полезная информация</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск статей..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#C4E538] focus:ring-2 focus:ring-[#C4E538]/20 outline-none transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#1E2A38] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <div
          onClick={() => setSelectedPost(filteredPosts[0])}
          className="bg-white rounded-3xl overflow-hidden shadow-sm mb-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={filteredPosts[0].image || "/placeholder.svg"}
                alt={filteredPosts[0].title}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-[#C4E538] text-[#1E2A38] text-sm font-medium rounded-full">
                  {filteredPosts[0].category}
                </span>
                <span className="text-sm text-gray-500">{filteredPosts[0].readTime}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#1E2A38] mb-3">{filteredPosts[0].title}</h2>
              <p className="text-gray-600 mb-4">{filteredPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {filteredPosts[0].author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(filteredPosts[0].date).toLocaleDateString("ru-RU")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.slice(1).map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-3xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-40 object-cover" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-[#C4E538]/20 text-[#1E2A38] text-xs font-medium rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-[#1E2A38] mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString("ru-RU")}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Статьи не найдены</p>
        </div>
      )}
    </div>
  )
}
