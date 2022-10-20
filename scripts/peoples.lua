type Gender = "Male" | "Female" | "Other"
type Attribute = "Something"

type People = {
    name: string,
    gender: Gender,
    attributes: { [number] : Attribute }
}

-- true = not included, false = included
local function filter(person: People): boolean
    return false
end

local function createAPeople(name, gender, attributes)
    return { name = name, gender = gender, attributes = attributes }
end

local peoples: { [number] : People } = {
    createAPeople("Amanda", "Female", {}),
    createAPeople("Angel", "Male", {}),
    createAPeople("Antonio", "Male", {}),
    createAPeople("Brianna", "Female", {}),
    createAPeople("Bryce", "Male", {}),
    createAPeople("Christian", "Male", {}),
    createAPeople("Daniel", "Male", {}),
    createAPeople("Deron", "Male", {}),
    createAPeople("Eliana", "Female", {}),
    createAPeople("Ethan", "Male", {}),
    createAPeople("Jocelyn", "Female", {}),
    createAPeople("Julia", "Female", {}),
    createAPeople("Kati", "Female", {}),
    createAPeople("Liam", "Male", {}),
    createAPeople("Luvpreet", "Male", {}),
    createAPeople("Martha", "Female", {}),
    createAPeople("Mason", "Male", {}),
    createAPeople("Nicole", "Female", {}),
    createAPeople("Risio", "Male", {}),
    createAPeople("Savannah", "Female", {}),
}

local filtered = {}
for _, people in peoples do
    if not filter(people) then
        table.insert(filtered, people)
    end
end

local assembledString = "EVAL 'redis.call(\"DEL\", \"terms\") local names={"
for i, people in filtered do
    local lastQuote = if i == #filtered then "\"" else "\","
    assembledString = assembledString.."\""..people.name..lastQuote
end
assembledString = assembledString.."} for _, name in ipairs(names) do redis.call(\"ZADD\", \"terms\", 1200, name) end' 0"
print(assembledString)